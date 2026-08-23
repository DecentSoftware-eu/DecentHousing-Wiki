
def define_env(env):

    @env.macro
    def permissions(command: str, subcommand: str = ""):
        strings = ["## Permissions", ""]

        if not command or command == "":
            strings.extend(["No known permissions for this command.", "", "<small>See the [Permissions](/commands/permissions.md) page for more details.</small>"])

            return "\n".join(strings)
        
        strings.append(f"- `housing.command.{command}`")
        if subcommand and subcommand != "":
            strings.append(f"- `housing.command.{command}.{subcommand}`")
        strings.extend(["", "<small>See the [Permissions](/commands/permissions.md) page for more details.</small>"])
        return "\n".join(strings)

    @env.macro
    def aliases(aliases = []):
        strings = ["## Aliases", ""]

        if not aliases or len(aliases) == 0:
            strings.append("This command has no known aliases.")

            return "\n".join(strings)
        
        for alias in aliases:
            strings.append(f"- `{alias}`")
        
        return "\n".join(strings)