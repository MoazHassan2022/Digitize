db.createUser(
    {
        user: "root",
        pwd: "bookslovescooks",
        roles: [
            {
                role: "readWrite",
                db: "Connect"
            }
        ]
    }
);
db.createCollection("test");
