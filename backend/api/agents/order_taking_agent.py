import os
import json
from .utils import get_chatbot_response, double_check_json_output
from openai import OpenAI
import re
from copy import deepcopy
from dotenv import load_dotenv
from collections import defaultdict


load_dotenv()


class OrderTakingAgent:
    def __init__(self, recommendation_agent):
        self.client = OpenAI(
            api_key=os.getenv("RUNPOD_TOKEN"),
            base_url=os.getenv("RUNPOD_CHATBOT_URL"),
        )
        self.model_name = os.getenv("MODEL_NAME")
        self.recommendation_agent = recommendation_agent

    def get_response(self, messages):
        messages = deepcopy(messages)
        system_prompt = """
            You are a customer support bot for a coffee shop called "Merry's Way."  
            [You are an API that only returns valid JSON.]

            Your primary responsibility is to take orders, validate items, and respond to user queries about the menu. You must always return a valid JSON object strictly adhering to the format and requirements provided below.

            Menu:
            - Cappuccino - $4.50
            - Jumbo Savory Scone - $3.25
            - Latte - $4.75
            - Chocolate Chip Biscotti - $2.50
            - Espresso shot - $2.00
            - Hazelnut Biscotti - $2.75
            - Chocolate Croissant - $3.75
            - Dark Chocolate (Drinking Chocolate) - $5.00
            - Cranberry Scone - $3.50
            - Croissant - $3.25
            - Almond Croissant - $4.00
            - Ginger Biscotti - $2.50
            - Oatmeal Scone - $3.25
            - Ginger Scone - $3.50
            - Chocolate syrup - $1.50
            - Hazelnut syrup - $1.50
            - Caramel syrup - $1.50
            - Sugar-Free Vanilla syrup - $1.50
            - Dark Chocolate (Packaged Chocolate) - $3.00

            Rules:
            1. JSON Output Only: Always respond with a single, valid JSON object. Do not include any extra text, Markdown formatting, or newlines outside the JSON.
            2. Use Double Quotes: Use double quotes (") for all JSON keys and values. Never use single quotes ('), backticks (`), or omit quotes for keys or string values.
            3. Error Handling: If the input is invalid or cannot be processed, return an error JSON like this:
            {
                "error": "The input could not be processed.",
                "details": "Reason why the input is invalid or unprocessable."
            }
            4. Escape Characters: If double quotes (") appear inside a string, escape them using a backslash (\").
            5. Order Validation: If an item is not in the menu, exclude it from the order, inform the user in the "response", and proceed with the remaining valid items.
            6. **Enclose Output in `{}`**: Your output must always start with `{` and end with `}`.
            7. Your output must always start with `{` and end with `}`. Do not include any additional text, explanations, or formatting outside the JSON.
            8. Always structure your output strictly in valid JSON format.
            9. Use double quotes (`"`) for all keys and string values.
            10. Escape any special characters in strings to ensure valid JSON.
            11. Do not include any text, explanations, or formatting outside the JSON.

            Tasks:
            1. Take the User's Order: Identify items and quantities requested by the user.
            2. Validate the Order: Ensure all items are from the menu. Exclude invalid items and notify the user.
            3. Repeat and Confirm: Ask the user if they need anything else.
            4. Finalize the Order:
            - List all ordered items with quantities and prices.
            - Calculate the total price.
            - Thank the user and close the conversation.

            Input Format:
            The user message will contain a section called "memory" with these fields:
            - "order": A list of previously ordered items.
            - "step number": The current step in the ordering process.

            Use this information to determine the next step in the process.

            JSON Output Format:
            Your output must always follow this structure:
            {
            "chain of thought": "Explain your reasoning, including the user's input, its relation to the coffee shop process, and how you formulated your response.",
            "step number": "Determine which task you are on based on the conversation.",
            "order": [
                {"item": "item name", "quantity": "number", "price": "total price"},
                {"item": "item name", "quantity": "number", "price": "total price"}
            ],
            "response": "Your response to the user in natural language.",
            "total": "Calculated total for the order."
            }

            Examples:
            1. Valid Order:
            User Input: "I want a Latte and a Chocolate Croissant."
            {
            "chain of thought": "The user requested a Latte and a Chocolate Croissant. Both items are on the menu, so I added them to the order.",
            "step number": "Determine which task you are on based on the conversation.",
            "order": [
                {"item": "Latte", "quantity": "1", "price": "4.75"},
                {"item": "Chocolate Croissant", "quantity": "1", "price": "3.75"}
            ],
            "response": "I've added a Latte and a Chocolate Croissant to your order. Would you like anything else?",
            "total": "8.5"
            }

            2. Invalid Item:
            User Input: "Can I get a Latte and a Muffin?"
            {
            "chain of thought": "The user requested a Latte and a Muffin. Latte is on the menu, but Muffin is not, so I excluded it from the order.",
            "step number": "Determine which task you are on based on the conversation.",
            "order": [
                {"item": "Latte", "quantity": "1", "price": "4.75"}
            ],
            "response": "I've added a Latte to your order. However, we don't have Muffin on our menu. Would you like anything else?",
            "total": "4.75"
            }

            3. Finalize Order:
            User Input: "That's all for now."
            {
            "chain of thought": "The user confirmed they don't want anything else. I finalized their order and calculated the total price.",
            "step number": "Determine which task you are on based on the conversation.",
            "order": [
                {"item": "Latte", "quantity": "1", "price": "4.75"},
                {"item": "Chocolate Croissant", "quantity": "1", "price": "3.75"}
            ],
            "response": "Your order is complete: Latte (x1, $4.75), Chocolate Croissant (x1, $3.75). The total is $8.50. Thank you for your order!",
            "total": "8.50"
            }

            4. Error Handling:
            User Input: "What's your favorite coffee?"
            {
            "error": "The input could not be processed.",
            "details": "The user's question is not relevant to the coffee shop ordering process."
            }
            
            5. Always return a valid JSON object or array. Do not include any additional text, explanations, or formatting outside the JSON.
            Example Output:
            {
            "order": [
                {"item": "Cappuccino", "quantity": "1", "price": "4.50"},
                {"item": "Latte", "quantity": "1", "price": "4.75"}
            ],
            "total": "9.25",
            "response": "Your updated order is: Cappuccino (x1, $4.50), Latte (x1, $4.75). The total for your order is now $9.25."
            }
            ### Example Output:
            {
            "chain_of_thought": "Explain your reasoning about the input and how you processed it.",
            "response": "Your updated order is: Latte (x1, $4.75). The total is $4.75. Thank you for your order!",
            "order": [
                {"item": "Latte", "quantity": "1", "price": "4.75"}
            ],
            "total": "4.75"
            }

            Notes:
            - Always ensure your output is a valid JSON object that can be parsed by standard JSON parsers.
            - If no items are valid, the "order" field should be an empty list, and the response should explain the situation to the user.
            - Always return a valid JSON object or array. Do not include any additional text, explanations, or formatting outside the JSON. If the input is invalid or cannot be processed, return an error JSON.
            """


        last_order_taking_status = ""
        asked_recommendation_before = False
        for message_index in range(len(messages) - 1, 0, -1):
            message = messages[message_index]

            agent_name = message.get("memory", {}).get("agent", "")
            if message["role"] == "assistant" and agent_name == "order_taking_agent":
                step_number = message["memory"]["step number"]
                order = message["memory"]["order"]
                asked_recommendation_before = message["memory"]["asked_recommendation_before"]
                last_order_taking_status = f"""
                step number: {step_number}
                order: {order}
                """

        messages[-1]["content"] = last_order_taking_status + " \n " + messages[-1]["content"]
        input_messages = [{"role": "system", "content": system_prompt}] + messages

        chatbot_response = get_chatbot_response(self.client, self.model_name, input_messages)

        # double check json
        #chatbot_response = double_check_json_output(self.client, self.model_name, chatbot_response)

        output = self.postprocess(chatbot_response, messages, asked_recommendation_before)

        return output
    

    def fix_single_quotes(self,json_string):
        # Chỉ thay thế dấu nháy đơn bao quanh key và value
        json_string = re.sub(r"(?<=[{:])'(.*?)'", r'"\1"', json_string)  # Thay dấu nháy đơn quanh value
        json_string = re.sub(r"'(.*?)':", r'"\1":', json_string)  # Thay dấu nháy đơn quanh key
        return json_string

    
    def extract_json_string(self, raw_output):
        # Loại bỏ các ký tự không cần thiết khỏi đầu ra
        raw_output = raw_output.strip()

        # Dùng regex để tìm đoạn JSON đầu tiên khớp với '{...}'
        match = re.search(r"\{.*\}|\[.*\]", raw_output, re.DOTALL)
        if match:
            json_string = match.group(0)
            
            # Chỉ thay thế các dấu nháy đơn cần thiết
            json_string = self.fix_single_quotes(json_string)
            return json_string
        else:
            raise ValueError("Không tìm thấy JSON hợp lệ trong chuỗi trả về.")
    
    def clean_response(self, raw_output):
        # Lọc bỏ các phần không phải JSON
        try:
            match = re.search(r"(\{(?:[^{}]|(?R))*\})", raw_output, re.DOTALL)
            if match:
                return match.group(0)
            else:
                raise ValueError("Không tìm thấy JSON hợp lệ.")
        except Exception as e:
            raise ValueError(f"Lỗi khi làm sạch chuỗi phản hồi: {e}")
    
        

    def merge_orders(self, previous_order, current_order):
        merged = defaultdict(lambda: {"quantity": 0, "price_per_item": 0.0})
        
        # Thêm các món từ đơn hàng cũ
        for order in previous_order:
            item_name = order["item"]
            merged[item_name]["quantity"] += int(order["quantity"])
            merged[item_name]["price_per_item"] = float(order["price"]) / int(order["quantity"])

        # Thêm hoặc cập nhật các món từ đơn hàng mới
        for order in current_order:
            item_name = order["item"]
            quantity = int(order["quantity"])
            price_per_item = float(order["price"]) / quantity if quantity > 0 else 0.0

            merged[item_name]["quantity"] += quantity
            merged[item_name]["price_per_item"] = price_per_item

        # Trả về danh sách đơn hàng đã gộp
        return [
            {"item": item, "quantity": str(data["quantity"]), "price": f"{data['quantity'] * data['price_per_item']:.2f}"}
            for item, data in merged.items()
        ]


    def postprocess(self, output, messages, asked_recommendation_before):
        # Làm sạch và trích xuất JSON
        output = output.strip().replace("```", "").replace("\n", "")
        print(f"Raw output: {output}")

        try:
            json_part = self.extract_json_string(output)
            print(f"Extracted JSON: {json_part}")
        except ValueError as e:
            raise ValueError(f"Lỗi khi trích xuất JSON: {e}")

        try:
            output = json.loads(json_part)
        except json.JSONDecodeError as e:
            raise ValueError(f"Lỗi khi parse JSON: {e}")

        # Kiểm tra xem chatbot đã trả về đầy đủ thông tin hay chưa
        if "order" not in output or "response" not in output:
            raise ValueError("JSON trả về không đầy đủ thông tin cần thiết.")

        # Nếu thiếu trường "total", tự tính toán
        if "total" not in output:
            output["total"] = str(sum(float(item["price"]) for item in output["order"]))

        # Cập nhật phản hồi và bộ nhớ
        response = output["response"]
        if not asked_recommendation_before and len(output["order"]) > 0:
            recommendation_output = self.recommendation_agent.get_recommendations_from_order(messages, output["order"])
            response = recommendation_output["content"]
            asked_recommendation_before = True

        dict_output = {
            "role": "assistant",
            "content": response,
            "memory": {
                "agent": "order_taking_agent",
                "step number": output.get("step number", 1),
                "asked_recommendation_before": asked_recommendation_before,
                "order": output["order"],
                "total": output["total"],
            },
        }
        return dict_output






        
    
    