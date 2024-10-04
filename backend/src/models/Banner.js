const { validateHexColor } = require('../utils/guideHelpers');
const { validateCloseButtonAction, validatePosition } = require('../utils/banner.helper');

module.exports = (sequelize, DataTypes) => {
    const Banner = sequelize.define('Banner', {
        closeButtonAction: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isValidAction(value) {
                validateCloseButtonAction(value);
              },
            },
          },
          position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isValidPosition(value) {
                validatePosition(value);
              },
            },
          },
          url: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          fontColor: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "#FFFFFF",
            validate: {
              isHexColor(value) {
                  validateHexColor(value, 'fontColor');
              },
            },
          },
          backgroundColor: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "#FFFFFF",
            validate: {
              isHexColor(value) {
                  validateHexColor(value, 'backgroundColor');
              },
            },
          },
          bannerText: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
          },

        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
    },
        {
            tableName: "banners",
            timestamps: false,
        },
    );

    Banner.associate = (models) => {
        Banner.belongsTo(models.User, { foreignKey: "createdBy", as: "creator" });
    };
    return Banner;
};

