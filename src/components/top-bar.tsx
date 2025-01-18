import { Command, CommandInput } from "@/components/ui/command";

const Topbar = () => {
  return (
    <section className="fixed md:sticky flex z-10 justify-between top-0 left-0 right-0 w-full py-4 bg-white">
      <div className="mx-auto w-11/12 lg:w-2/5">
        <Command className="bg-gray-100">
          <CommandInput placeholder="find country" />
        </Command>
      </div>
    </section>
  );
};

export default Topbar;
