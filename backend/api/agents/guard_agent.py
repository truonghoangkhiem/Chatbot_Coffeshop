from openai import OpenAI
import os
import json
from copy import deepcopy
from .utils import get_chatbot_response, double_check_json_output
import dotenv

dotenv.load_dotenv()


class GuardAgent:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("RUNPOD_TOKEN"), base_url=os.getenv("RUNPOD_CHATBOT_URL")
        )
        self.model_name = os.getenv("MODEL_NAME")

    def get_response(self, messages):
        messages = deepcopy(messages)

        system_prompt = """
            You are a helpful AI assistant for a coffee shop application which serves drinks and pastries.
            Your task is to determine whether the user is asking something relevant to the coffee shop or not.
            
            The user is allowed to:
            1. Ask questions about the coffee shop, like location, working hours, menue items and coffee shop related questions.
            2. Ask questions about menue items, they can ask for ingredients in an item and more details about the item.
            3. Make an order.
            4. ASk about recommendations of what to buy.
            
             The user is NOT allowed to:
            1. Ask questions about anything else other than our coffee shop.
            2. Ask questions about the staff or how to make a certain menu item.
            
            Your output must strictly follow the JSON format:
            - Do NOT include any text like "Here is the response in the required JSON format."
            - Do NOT include Markdown formatting like ``` or any extra line breaks outside JSON.
            - All keys and string values must be enclosed in double quotes (`"`).
            - Single quotes (`'`) are allowed inside string values as part of the content, e.g., `"John's book"` is valid.
            - Do not include single quotes to define JSON keys or string values. Only use double quotes for these purposes.
            - Escape any double quotes (`"`) that appear inside string values using a backslash (`\"`).
            - Do not include any additional text outside the JSON structure.
            - Your output must start with `{` and end with `}`.
            - Do NOT add any extra newline characters before or after the JSON.


            Your output should be in a structured json format like so. each key is a string and each value is a string. Make sure to follow the format exactly:
            {
            "chain of thought": "go over each of the points above and make see if the message lies under this point or not. Then you write some your thoughts about what point is this input relevant to."
            "decision": "allowed" or "not allowed". Pick one of those. and only write the word.
            "message": leave the message empty if it's allowed, otherwise write "Sorry, I can't help with that. Can I help you with your order?"
            }
            
            """

        input_messages = [{"role": "system", "content": system_prompt}] + messages[-3:]

        chatbot_output = get_chatbot_response(self.client, self.model_name, input_messages)
        #chatbot_output = double_check_json_output(self.client, self.model_name, chatbot_output)
        output = self.postprocess(chatbot_output)

        return output

    def postprocess(self, output):
        try:
            output = output.strip()
            if not output.endswith("}"):
                output += "}"
            json_object = json.loads(output)
            
            # Kiểm tra nếu "message" trống khi decision là "not allowed"
            if json_object.get("decision") == "not allowed" and not json_object.get("message"):
                json_object["message"] = "Sorry, I can't help with that. Can I help you with your order?"

            # Kiểm tra các khóa cần thiết
            required_keys = ["decision", "message"]
            for key in required_keys:
                if key not in json_object:
                    raise ValueError(f"Missing required key: {key} in JSON response")

        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}")
            print(f"Invalid JSON received: {output}")
            raise ValueError("Invalid JSON format from chatbot")
        
        dict_output = {
            "role": "assistant",
            "content": json_object.get("message", ""),
            "memory": {
                "agent": "guard_agent",
                "guard_decision": json_object.get("decision", "unknown"),
            },
        }
        return dict_output

