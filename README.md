# smart-bin-ai
AI-powered Smart Recycling Assistant using computer vision to detect waste and provide disposal instructions with carbon impact tracking.




#features that we wanted to add
Develop an AI-powered Smart Recycling Assistant that uses a webcam and computer vision to identify waste items and guide users on proper disposal.
The system captures a real-time video feed through the webcam and analyzes each frame using a pretrained computer vision model to detect the type of material present in the object.
The detected object is classified into major recyclable categories such as plastic, paper, metal, and glass, which forms the core functionality of the system.
Once the item is identified, the application displays a clear instructional overlay on the screen telling the user how to properly dispose of the item, for example washing a plastic bottle before placing it in the recycling bin.
The solution also incorporates Optical Character Recognition (OCR) to detect and read resin codes (1–7) printed on plastic packaging, enabling the system to determine the exact plastic type and provide more accurate recycling instructions.
To encourage responsible recycling behavior, the system includes an environmental impact feature that shows users the potential benefits of correctly sorting waste, such as carbon emissions reduced, energy saved, and resources conserved.
Additionally, the platform integrates a gamification mechanism where users earn sustainability points or badges for correctly sorting items, which motivates consistent participation in eco-friendly practices.
The application is implemented using Python for logic, OpenCV for image processing, TensorFlow or PyTorch for object detection, EasyOCR or Tesseract for text recognition, and Streamlit for building the user interface.
Overall, the system functions as an intelligent sustainability assistant that combines computer vision, OCR, and interactive feedback to simplify recycling, reduce waste contamination, and promote participation in the circular economy.
