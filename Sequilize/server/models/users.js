module.exports = (sequelize, DataTypes) => {
  // package for hashing
  const bcrypt = require("bcryptjs");
  // package for compressing
  const zlib = require("zlib");
  // hash
  const salt = bcrypt.genSaltSync(10);

  const initializeUser = () => {
    user
      .sync({ alter: true })
      .then(() => {
        const buildANDsave = async () => {
          const user1 = user.build({
            username: "user1",
            password: "user123",
            age: 20,
          });
          await user1.save();
        };

        const create = async () => {
          return user.create({
            username: "user1",
            password: "user123",
            age: 20,
          });
        };

        const getData = async () => {
          const data = await user.findAll({
            attributes: [
              "username",
              [sequelize.fn("SUM", sequelize.col("uid")), "sum_users"],
            ],
            group: "username",
          });
          data.forEach((value) => console.log(value.toJSON()));
        };

        const bulkCreate = () => {
          console.log("Bulk created user data");
          user.bulkCreate([
            {
              username: "user1",
              password: "user321",
              age: 20,
              description: "This is a description section which is very long.",
            },
            {
              username: "user2",
              password: "user123",
              age: 21,
              description: "This is a description section which is very long.",
            },
            {
              username: "user3",
              password: "user456",
              age: 20,
              description: "This is a description section which is very long.",
            },
            {
              username: "user4",
              password: "user789",
              age: 21,
              description: "This is a description section which is very long.",
            },
          ]);
        };

        // bulkCreate();

        // destroy
        // user.destroy({ truncate: true });
      })
      .catch((err) => console.log(err));
  };

  const user = sequelize.define(
    "users",
    {
      uid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get() {
          this.getDataValue(undefined);
        },
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        get() {
          this.getDataValue(undefined);
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        },
        get() {
          this.getDataValue(undefined);
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: {
            msg: "You must enter an numeric value for age!! ",
          },
          isOldEnough(value) {
            if (value < 20) throw new Error("Too young!!");
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        set(value) {
          const compressedValue = zlib.deflateSync(value).toString("base64"); //deflateSync() creates an buffer  //base64 binary data into text ( buffer to string )
          this.setDataValue("description", compressedValue);
        },
        get() {
          const compressedValue = this.getDataValue("description");
          const uncompressedValue = zlib.inflateSync(
            //inflateSync() takes an buffer
            Buffer.from(compressedValue, "base64")
          );
          return uncompressedValue.toString();
        },
      },
    },
    {
      timestamps: false,
    }
  );
  return user;
};
