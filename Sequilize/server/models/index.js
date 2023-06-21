// package for hashing
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

// package for compressing
const zlib = require("zlib");

const { DataTypes, Model, Sequelize, Op } = require("sequelize");

const sequelize = new Sequelize(
  "sequelize_sample_2",
  "postgres",
  "AnePsql204",
  {
    dialect: "postgres",
  }
);

const user = sequelize.define(
  "users",
  {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
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
        username: "user5",
        password: "user321",
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

// const Student = sequelize.define(
//   "students",
//   {
//     student_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [4, 20],
//       },
//     },
//     age: {
//       type: DataTypes.INTEGER,
//       defaultValue: 20,
//       allowNull: false,
//     },
//     favorite_class: {
//       type: DataTypes.STRING,
//       defaultValue: "Computer science",
//     },
//     school_year: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     subscribed: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// Student.sync({ alter: true })
//   .then(() => {
//     console.log("student model synced successfully!");

//     // // bulk create
//     // Student.bulkCreate([
//     //   {
//     //     name: "abcd",
//     //     favorite_class: "Electrical",
//     //     school_year: 2000,
//     //     subscribed: true,
//     //     age: 25,
//     //   },
//     //   {
//     //     name: "efgh",
//     //     school_year: 2005,
//     //     subscribed: true,
//     //   },
//     //   {
//     //     name: "ijkl",
//     //     favorite_class: "Electrical",
//     //     school_year: 2002,
//     //     subscribed: false,
//     //     age: 18,
//     //   },
//     //   {
//     //     name: "mnop",
//     //     school_year: 2009,
//     //     subscribed: true,
//     //     age: 21,
//     //   },
//     //   {
//     //     name: "qrst",
//     //     school_year: 2010,
//     //     subscribed: false,
//     //     age: 19,
//     //   },
//     // ]);

//     // // delete all records
//     // Student.destroy({ truncate: true });

//     return Student.findAll({
//       attributes: ["name"],
//       where: {
//         [Op.or]: {
//           favorite_class: "Computer Science",
//           subscribed: true,
//         },
//       },
//     });
//   })
//   .then((data) => {
//     console.log(
//       "Name of every student whose favorite class is computer science or they are subscribed"
//     );
//     data.forEach((value) => console.log(value.toJSON()));
//     return Student.findAll({
//       attributes: [
//         "school_year",
//         [sequelize.fn("COUNT", sequelize.col("student_id")), "num_students"],
//       ],
//       group: "school_year",
//     });
//   })
//   .then((data) => {
//     console.log("Total number of student in each school year:");
//     data.forEach((value) => console.log(value.toJSON()));
//   })
//   .catch((err) => console.log(err));
