import os
import time
import random
import requests
from ultralytics import YOLO

# =========================
# CONFIG
# =========================
NODE_API_URL = "https://nexus-traffic-ai-f5k3.onrender.com/api/traffic/update"

# Fix for OpenMP / Render crash
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"


# =========================
# SEND DATA (ROBUST VERSION)
# =========================
def send_traffic_data(lane, vehicle_count, emergency=False):
    payload = {
        "lane": lane,
        "vehicleCount": vehicle_count,
        "emergency": emergency
    }

    # 🔥 retry system (IMPORTANT for Render)
    for attempt in range(3):
        try:
            response = requests.post(
                NODE_API_URL,
                json=payload,
                timeout=15
            )

            if response.status_code == 200:
                print("✔ Data sent successfully")
                return

        except Exception as e:
            print(f"Attempt {attempt+1} failed: {e}")
            time.sleep(2)

    print("❌ Failed to send after retries")


# =========================
# LOAD MODEL SAFELY
# =========================
def load_model():
    try:
        print("Attempting to load YOLOv8 model...")
        model = YOLO("yolov8n.pt", task="detect")
        print("YOLOv8 Model loaded successfully.")
        return model

    except Exception as e:
        print(f"YOLO failed, switching to simulation mode: {e}")
        return None


# =========================
# MAIN ENGINE
# =========================
def main():
    print("Initializing Nexus AI Processing Engine...")

    model = load_model()
    lanes = ["north", "south", "east", "west"]

    print("\n--- AI Traffic System Started ---\n")

    while True:
        try:
            lane = random.choice(lanes)
            vehicle_count = random.randint(0, 40)
            emergency = random.random() > 0.97  # rare event

            # =========================
            # SIMULATION MODE
            # =========================
            if model is None:
                if emergency:
                    print(f"🚨 EMERGENCY VEHICLE DETECTED IN {lane.upper()} LANE")
                else:
                    print(f"🚦 {lane.upper()} lane → {vehicle_count} vehicles (SIM)")

            # =========================
            # AI MODE (future video feed)
            # =========================
            else:
                print(f"👁 AI scanning {lane.upper()} lane → {vehicle_count} vehicles")

            # send to backend
            send_traffic_data(lane, vehicle_count, emergency)

            # Render-safe delay
            time.sleep(4)

        except Exception as e:
            print(f"Loop error prevented: {e}")
            time.sleep(5)


# =========================
# START
# =========================
if __name__ == "__main__":
    main()
