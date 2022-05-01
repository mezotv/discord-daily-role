require("dotenv").config();


function giveRole(client) {
    const guild = client.guilds.cache.get(process.env.GUILD_ID);
  
    guild.members.cache.find().then((members) => {
      const randomMember = members.random();
      let role = guild.roles.cache.get(roleID);
  
      /* ---- Removing the role from previous members ---- */
      members.forEach((member) => {
        member.roles.cache.some((role) => {
          if (role.id === roleID) {
            member.roles.remove(role);
          }
        });
      });
    });
}

module.exports = { giveRole };