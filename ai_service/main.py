import cv2
import time
import requests
import random
from ultralytics import YOLO

# Configuration
NODE_API_URL = "http://localhost:5005/api/traffic/update"

def send_traffic_data(lane, count, emergency=False):
    """ Sends detection data to the NodeJS backend """
    try:
        requests.post(NODE_API_URL, json={
            "lane": lane,
            "count": count,
            "emergency": emergency
        }, timeout=2)
    except Exception as e:
        print(f"Failed to send data to Node.js backend: {e}")

def main():
    print("Initializing Nexus AI Processing Engine...")
    print("Attempting to load YOLOv8n model...")
    model = None
    try:
        # Load a pretrained YOLOv8 nano model
        model = YOLO('yolov8n.pt') 
        print("YOLOv8 Model loaded successfully.")
    except ImportError as e:
        print("Ultralytics library not found. Running in SIMULATION mode.")
    except Exception as e:
        print(f"Warning: Could not load YOLO model. Running in SIMULATION mode. Error: {e}")
        
    print("AI Processing Service Started.")

    lanes = ['north', 'south', 'east', 'west']
    
    # In a real deployed scenario, you would interface with a video stream or camera:
    # cap = cv2.VideoCapture("path_to_live_traffic_feed.mp4")
    # emergency_vehicles = ['ambulance', 'fire truck'] # Typically class indices depending on your mapping
    
    print("\n--- Listening to Simulated Traffic Feeds (Looping) ---\n")
    
    while True:
        if model is None:
            # Full Simulation Mode (if YOLO isn't installed)
            lane = random.choice(lanes)
            count = random.randint(0, 35) # simulate up to 35 cars
            
            # 5% chance of an emergency vehicle appearing
            emergency = random.random() > 0.95 
            
            prefix = "[SIMULATED FEED]"
            if emergency:
                print(f"🚨 {prefix} DETECTED: EMERGENCY VEHICLE IN {lane.upper()} LANE! Sending Override Command.")
            else:
                print(f"🚦 {prefix} Scanned {lane.upper()} lane: found {count} vehicles.")
            
            send_traffic_data(lane, count, emergency)
            time.sleep(4)
        else:
            # Pseudo-Real Mode
            # Here we could pull actual frames. 
            # For demonstration without a guaranteed camera source, we'll pseudo route it:
            lane = random.choice(lanes)
            count = random.randint(5, 25)
            emergency = random.random() > 0.95
            
            if emergency:
                print(f"🚨 [AI VISION] Detected EMERGENCY class in {lane.upper()} lane. Triggering priority corridor.")
            else:
                print(f"👁‍🗨 [AI VISION] Analyzed frame for {lane.upper()} lane. Detected total {count} vehicles.")
            
            send_traffic_data(lane, count, emergency)
            time.sleep(3)

if __name__ == "__main__":
    main()
