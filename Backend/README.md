# ImiTech

This is inventory management and Accounting software

## Tech Stack

**Client:** Next.js, TailwindCSS

**Server:** Node, Express, bcrypt, bcryptjs, cookie-parser, cors, dotenv, express, jsonwebtoken, multer, nodemon, socket.io

## API Reference

#### Get all account

```http
  GET /api/account/get
```

| Parameter | Type   | Description        |
| :-------- | :----- | :----------------- |
| `null`    | `json` | **Required**. null |

#### Post account

```socket
  POST /api/account/post
```

| Parameter | Type   | Description              |
| :-------- | :----- | :----------------------- |
| `data`    | `json` | **Required**. body: data |

#### Put account

```socket
  PUT /api/account/put
```

| Parameter | Type          | Description                  |
| :-------- | :------------ | :--------------------------- |
| `id`      | `number/json` | **Required**. id, body: data |

#### Post account

```socket
  DELETE /api/account/post
```

| Parameter | Type     | Description      |
| :-------- | :------- | :--------------- |
| `id`      | `number` | **Required**. id |

#### Get-By-Id account

```http
  GET /api/account/get-account/${id}
```

| Parameter | Type     | Description      |
| :-------- | :------- | :--------------- |
| `id`      | `number` | **Required**. id |
