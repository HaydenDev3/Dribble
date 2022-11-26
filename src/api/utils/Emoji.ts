import Role from "./Guild/GuildRole";
import Collection from "./Collection";
import User from "./User/User";
import { BaseEmoji } from "./emojis/BaseEmoji";

export default class Emoji extends BaseEmoji {
    constructor(
        id: string | null,
        name: string,
        roles: Collection<string, Role> | null,
        user: User | null,
        required_colons: boolean | null,
        managed: boolean | null,
        animated: boolean | null,
        available: boolean | null
    ) {
        super(
            id,
            name,
            roles,
            user,
            required_colons,
            managed,
            animated,
            available
        );
    }
}
