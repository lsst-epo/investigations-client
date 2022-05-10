# Next frontend

Next.js frontend intended to be used with the Rubin EPO [craft-cms-template](https://github.com/lsst-epo/craft-cms-template/).

## Local development

0. Ensure that the Craft CMS container is running and functioning correctly by going to http://localhost:8080/api, if everything is working fine you should see some message about a missing GraphQL query
1. Create a `.env` file in the root of your project based on the `.env.local.sample`
1. Install dependencies ```yarn``` 
2. Start the dev server ```yarn dev``` 

## Running the client within a Docker container

Running the client within a container is a good way to test deployment in a production-like environment.

There is one crucial thing to keep in mind when configuring your local client to run in a Docker container: Docker containers run in an isolated network that have a different concept of the usage of "localhost". As such, despite the fact that the Craft CMS container may be exposed at localhost on port 8080 on the host machine (your laptop), within the client container "localhost" is local to that container. In order for the client container to be able to communicate with the Craft CMS container you need to know the Craft CMS container's gateway IP address.

Luckily, a node.js script is bundled with this code and Docker allows for arguments to be passed into a `docker build` command.

In order to build the Docker client image **ensure the API project is running** then enter the following command in the root project folder:

```
docker build -t epo/rubin_ui . --build-arg API_IP=$(node getApiGatewayURL) --build-arg API_PORT=8080
```

As mentioned, if the Craft CMS container project is not running within a Docker container before running the above command then the build may succeed, but will have broken links, images, and missing content.

Finally, once the image is built, create/start the Docker container with the following command:

```
docker run -p 3000:3000 epo/rubin_ui
```

## Finding the Craft CMS container's IP address

### Automated:

For your convenience, a node.js script has been included in this repo that grabs the Craft CMS container Docker gateway IP and logs it to the terminal. Ensure the Craft CMS container is running, then in the terminal enter:

```
node getApiGatewayURL
```


### Manual:

1. Ensure that the Craft CMS container is running and functioning correctly by going to http://localhost:8080/api, if everything is working fine you should see some message about a missing GraphQL query
2. In the terminal, enter the command ```docker network ls``` and you should she text table output - under the "NAME" column verify that you see one row with the value of the Craft CMS container
3. Enter the command ```docker network inspect <NAME>```
4. The ouput from the above command will be a JSON object, the gateway IP can be found at: IPAM.Config.Gateway

This IP will change between bringing up and down the container, so keep in mind that you'll need to do this step everytime you bring the Craft CMS containers down and back up.

