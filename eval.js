module.exports  = (client) =>

{
  const config = require("./config.json")
  const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
client.on("message", message => {
  const args = message.content.split(" ").slice(1);
 
  if (message.content.startsWith("<eval")) {
    if(!config.ownerID.includes(message.author.id)) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string"){
        evaled = require("util").inspect(evaled);
      }
 console.log(clean(evaled))
      if((code.includes("client.token") || code.includes("client[\"token\"]") || code.includes("client[\`token\`]") || code.includes("client[\'token\']") )){
        return message.channel.send("Oj tokenu nie dostaniesz cwelu")
      }
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
});
}