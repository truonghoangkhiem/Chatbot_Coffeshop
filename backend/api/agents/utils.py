import json


def get_chatbot_response(client, model_name, messages, temperature=0):
    input_messages = []
    for message in messages:
        input_messages.append({"role": message["role"], "content": message["content"]})

    response = client.chat.completions.create(
        model=model_name,
        messages=input_messages,
        temperature=temperature,
        top_p=0.8,
        max_tokens=2000,
    )
    print("Response:", response)
    # Lấy nội dung JSON từ message.content
    if len(response.choices) > 0 and hasattr(response.choices[0], "message"):
        return response.choices[0].message.content
    else:
        raise ValueError("No valid choices found in the response")


def get_embedding(embedding_client, model_name, text_input):
    output = embedding_client.embeddings.create(input=text_input, model=model_name)

    embedings = []
    for embedding_object in output.data:
        embedings.append(embedding_object.embedding)

    return embedings


def double_check_json_output(client, model_name, json_string):
    prompt = f""" You will check this json string and correct any mistakes that will make it invalid. Then you will return the corrected json string. Nothing else. 
    If the Json is correct just return it.

    if there is any text before order after the json string, remove it.
    Do NOT return a single letter outside of the json string.
    Make sure each key is enclosed in double quotes.
    The first thing you write be open curly brace of the json and the last letter you write should be the closing curly brace.

    You should check the json string for the following text between triple backicks:
    
     ```
    {json_string}
    ```
    """

    messages = [{"role": "user", "content": prompt}]

    response = get_chatbot_response(client, model_name, messages)
    # Loại bỏ các ký tự không hợp lệ, như dấu backtick
    cleaned_response = response.strip().strip("```").strip()
    # print("Cleaned Response:", cleaned_response)  # Debugging

    # Sử dụng thư viện JSON để đảm bảo định dạng hợp lệ
    try:
        corrected_json = json.loads(cleaned_response)  # Kiểm tra JSON hợp lệ
        return json.dumps(corrected_json, indent=4)  # Chuỗi JSON chuẩn
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON returned by AI: {cleaned_response}") from e