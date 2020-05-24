FROM ubuntu:16.04

ENV NODE_ENV="production" \
	TOKEN="" \
	DATABASE="" \
	DEFAULT_PREFIX="=" \
	VERIFICATION_EXPIRE="5" \
	BOT_OWNER_ID="456832569904726019" \
	TRANSFER_AFTER_VERIFICATION="3" \
	MAIN_SERVER="" \
	VERIFICATION_CODE_SIZE="12" \
	WARNING_INITIAL="1" \
	WARNING_THRESHOLD_INITIAL="3"

	

WORKDIR /root

RUN apt-get update \
	&& apt-get install -y curl \
	&& apt-get install -y build-essential \
	&& curl -sL https://deb.nodesource.com/setup_12.x | bash - \
	&& apt-get install -y nodejs \
	&& npm install pm2 -g \
	&& apt-get install -y dos2unix \
	&& apt-get install -y git \
	&& git clone https://github.com/Snavellet/3D-Lock.git

WORKDIR 3D-Lock

ADD environments.sh .

RUN npm install

RUN chmod +x environments.sh

RUN dos2unix environments.sh

#ENTRYPOINT ["./environments.sh"]
	
CMD ["./environments.sh"]
	
