"use strict";

import { EntitySchema, IsNull } from "typeorm";
import { User } from "./user.entity.js";

export const PostEntity = new EntitySchema({
    name: "Post",
    tableName: "posts",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        content: {
            type: "text",
        },
        userId: {
            nullable: false,
        }
    },
    relations: {
        creator: {
            type: "many-to-one",
            target: "user",
            joinColumn: { name: "userId" },
            onDelete: "CASCADE",
        },
    }
});

export default PostEntity;