from agents import (
    GuardAgent,
    ClassificationAgent,
    DetailsAgent,
    RecommendationAgent,
    OrderTakingAgent,
    AgentProtocol,
)
from typing import Dict
import os
import pathlib
import re

folder_path = pathlib.Path(__file__).parent.resolve()


def main():
    guar_agnet = GuardAgent()
    clssification_agent = ClassificationAgent()
    
    recommendation_agent = RecommendationAgent(
                                os.path.join(folder_path, "recommendation_objects/apriori_recommendations.json"),
                                os.path.join(folder_path, "recommendation_objects/popularity_recommendation.csv" ),
                             )
    
    agent_dict : Dict[str, AgentProtocol] =  {
        "details_agent": DetailsAgent(),
        "recommendation_agent":  recommendation_agent,
        "order_taking_agent": OrderTakingAgent( recommendation_agent)
    }
    
    
    messages = []

    while True:
        os.system("cls" if os.name == "nt" else "clear")
        print("\n\n Print Messsage ........")
        for message in messages:
            print(f"{message['role']}: {message['content']}")

        # Get user input
        prompt = input("User: ")
        messages.append({"role": "user", "content": prompt})

        # Get response from guard agent
        guar_agnet_response = guar_agnet.get_response(messages)
        print(f"Guard Agent: {guar_agnet_response['content']}")
        if guar_agnet_response["memory"]["guard_decision"] == "not allowed":
            messages.append(guar_agnet_response)
            continue

        # Get Clarification Agent's response
        classification_agent_response = clssification_agent.get_response(messages)

        chosen_agent = classification_agent_response["memory"]["classification_decision"]
        print("Chosen Agent: ", chosen_agent)

        # Get response from chosen agent
        agent = agent_dict[chosen_agent]
        response = agent.get_response(messages)
        
        messages.append(response)


if __name__ == "__main__":
    main()
