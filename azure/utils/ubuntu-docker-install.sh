
#!/bin/sh 
sudo apt update
sudo apt install -y apt-transport-https ca-certificates libcurl4 curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
apt-cache policy docker-ce
sudo apt -y install docker-ce
sudo systemctl status docker
sudo chown $USER /var/run/docker.sock