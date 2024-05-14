import mongoose from "mongoose"

const discordUserSchmea = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  discordId: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
})

export const discordUser = mongoose.model("discordUser", discordUserSchmea)
