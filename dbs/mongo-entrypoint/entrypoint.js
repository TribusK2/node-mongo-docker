var db = connect("mongodb://my_Admin:123zxc@localhost:27017/admin");

db = db.getSiblingDB('blog');

db.createUser(
    {
        user: "bloger",
        pwd: "123zxc",
        roles: [ { role: "readWrite", db: "blog"} ],
    }
)