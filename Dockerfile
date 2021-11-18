FROM ubuntu:latest

RUN apt-get -y update
RUN apt-get install -y curl
RUN apt-get install -y sudo

# download nodejs:
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
# install nodejs:
RUN sudo apt-get install -y nodejs
RUN sudo apt-get install -y python3-pip
# install opencv-python, skip questions:
#RUN sudo DEBIAN_FRONTEND=noninteractive apt-get -yq install python3-opencv

WORKDIR docker_ifcjson

COPY . /docker_ifcjson

#install ifcopenshell
RUN pip3 install -r requirements.txt

EXPOSE 8000 3000

# uncomment the following line for production:
#ENTRYPOINT ["npm", "start"]
