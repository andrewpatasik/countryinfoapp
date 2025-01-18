import { Command, CommandInput } from "@/components/ui/command";

const Topbar = () => {
  return (
    <section className="absolute top-0 w-full py-4 bg-white">
      <div className="mx-auto w-2/5">
        <Command>
          <CommandInput placeholder="find country" />
        </Command>
      </div>
    </section>
  );
};

export default Topbar;
