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

folder_path = pathlib.Path(__file__).parent.resolve()

class AgentController():
    def __init__(self):
        self.guar_agnet = GuardAgent()
        self.clssification_agent = ClassificationAgent()
        
        self.recommendation_agent = RecommendationAgent(
                                    os.path.join(folder_path, "recommendation_objects/apriori_recommendations.json"),
                                    os.path.join(folder_path, "recommendation_objects/popularity_recommendation.csv" ),
                                )
        
        self.agent_dict : Dict[str, AgentProtocol] =  {
            "details_agent": DetailsAgent(),
            "recommendation_agent":  self.recommendation_agent,
            "order_taking_agent": OrderTakingAgent( self.recommendation_agent)
        }
    
    def get_response(self, input):
        
        job_input = input["input"]
        messages = job_input["messages"]
        
        # Get response from guard agent
        guar_agnet_response = self.guar_agnet.get_response(messages)
        if guar_agnet_response["memory"]["guard_decision"] == "not allowed":
            return messages

        # Get Clarification Agent's response
        classification_agent_response = self.clssification_agent.get_response(messages)

        chosen_agent = classification_agent_response["memory"]["classification_decision"]

        # Get response from chosen agent
        agent = self.agent_dict[chosen_agent]
        response = agent.get_response(messages)
        
        return response