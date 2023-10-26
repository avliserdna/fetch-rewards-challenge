# Andre Silva's Fetch Reward Challenge Submission

To the recruiters, engineers, and hiring team at Fetch Rewards,

Thank you for giving me this opportunity to put my foot forward and display my talent.

To run the API, you will have to the follow these instructions.

1. Clone this repository using:

``git clone https://github.com/avliserdna/fetch-rewards-challenge.git`

or if you have SSH,

`git clone git@github.com:avliserdna/fetch-rewards-challenge.git`

2. Once you have the repository cloned, `fetch-rewards-challenge`, move to the directory by typing:

`cd fetch-rewards-challenge`

3. Move to the directory, `api` using the following command:

`cd api`

4. Once you're in the api directory, use the following command to build the file for docker.

`docker build -t receipt-processor`

5. After you've built the api directory, you can run the api using the following command:

`docker run -dp 8000:8000 receipt-processor`

Afterwards, you can make requests onto the application.

The API has the following request routes:

`POST /receipts/process`

# EXAMPLE POST REQUEST:

    {
    "retailer": "Walgreens",
    "purchaseDate": "2022-01-02",
    "purchaseTime": "08:13",
    "total": "2.65",
    "items": [
    {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
    {"shortDescription": "Dasani", "price": "1.40"}
    ]
    }

`GET /receipts/:id/points`

# EXAMPLE

`{ points: 15}`
