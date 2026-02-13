FROM python:3.11-slim

WORKDIR /app

# Install system dependencies including Blender requirements
RUN apt-get update && apt-get install -y \
    wget \
    xz-utils \
    libx11-6 \
    libxi6 \
    libxxf86vm1 \
    libxfixes3 \
    libxrender1 \
    libgl1 \
    libglu1-mesa \
    && rm -rf /var/lib/apt/lists/*

# Install Blender (optional - can be removed if using bpy package)
# RUN wget https://download.blender.org/release/Blender4.0/blender-4.0.0-linux-x64.tar.xz \
#     && tar -xf blender-4.0.0-linux-x64.tar.xz \
#     && mv blender-4.0.0-linux-x64 /opt/blender \
#     && ln -s /opt/blender/blender /usr/local/bin/blender \
#     && rm blender-4.0.0-linux-x64.tar.xz

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

EXPOSE 8001

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
