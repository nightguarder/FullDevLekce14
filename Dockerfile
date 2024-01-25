# Use the official MongoDB Alpine image from Docker Hub
FROM mongo:latest

# Set environment variables
#use ARG.
ARG MONGO_INITDB_ROOT_USERNAME
ARG MONGO_INITDB_ROOT_PASSWORD

ENV MONGO_INITDB_ROOT_USERNAME=$MONGO_INITDB_ROOT_USERNAME
ENV MONGO_INITDB_ROOT_PASSWORD=$MONGO_INITDB_ROOT_PASSWORD

# Expose the MongoDB port
EXPOSE 27017

# Start the MongoDB service when the container launches
CMD ["mongod"]

