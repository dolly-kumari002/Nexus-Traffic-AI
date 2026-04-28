import os
import time
import random
import sys

# Set standard output encoding to UTF-8 to support emojis on Windows
sys.stdout.reconfigure(encoding='utf-8')

# Fix OpenMP issue
os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"

lanes = ["north", "south", "east", "west"]

def main():
    print("\n🚦 Nexus Traffic AI (LOCAL MODE)\n")
    print("❌ Backend removed → Running fully local\n")
    print("--- SYSTEM STARTED ---\n")

    while True:
        try:
            lane = random.choice(lanes)
            vehicle_count = random.randint(0, 40)
            emergency = random.random() > 0.95

            if emergency:
                print(f"🚨 EMERGENCY → {lane.upper()} lane")
            else:
                print(f"🚗 {lane.upper()} → {vehicle_count} vehicles")

            # 👇 Yahi data tum frontend me manually inject kar sakti ho
            data = {
                "lane": lane,
                "vehicleCount": vehicle_count,
                "emergency": emergency
            }

            print("📊 DATA:", data, "\n")

            time.sleep(3)

        except KeyboardInterrupt:
            print("\n🛑 Stopped")
            break


if __name__ == "__main__":
    main()
