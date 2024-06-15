#!/bin/bash

# Set environment variables
export GALAXIA_CORE_VERSION="1.0.0-alpha"
export START_DIR="start"

# Create a start script for the Galaxia Core service
mkdir -p $START_DIR
echo "#!/bin/bash" > $START_DIR/start-galaxia-core.sh
echo "node dist/index.js" >> $START_DIR/start-galaxia-core.sh
chmod +x $START_DIR/start-galaxia-core.sh

# Configure system service (e.g., systemd)
if [ -f /etc/systemd/system/galaxia-core.service ]; then
  # Update existing service file
  sed -i "s/Version=.*/Version=$GALAXIA_CORE_VERSION/" /etc/systemd/system/galaxia-core.service
else
  # Create a new service file
  echo "[Unit]" > /etc/systemd/system/galaxia-core.service
  echo "Description=Galaxia Core Service" >> /etc/systemd/system/galaxia-core.service
  echo "After=network.target" >> /etc/systemd/system/galaxia-core.service
  echo "" >> /etc/systemd/system/galaxia-core.service
  echo "[Service]" >> /etc/systemd/system/galaxia-core.service
  echo "User=root" >> /etc/systemd/system/galaxia-core.service
  echo "ExecStart=$START_DIR/start-galaxia-core.sh" >> /etc/systemd/system/galaxia-core.service
  echo "Restart=always" >> /etc/systemd/system/galaxia-core.service
  echo "" >> /etc/systemd/system/galaxia-core.service
  echo "[Install]" >> /etc/systemd/system/galaxia-core.service
  echo "WantedBy=multi-user.target" >> /etc/systemd/system/galaxia-core.service
fi

# Reload systemd daemon and start the service
systemctl daemon-reload
systemctl start galaxia-core.service

# Print start information
echo "Galaxia Core $GALAXIA_CORE_VERSION started successfully!"
