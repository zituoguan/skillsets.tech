export default function Form() {
  const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

  return (
    <section id="contribute" className="mt-40">
      <div className="max-w-screen-md mx-auto mt-16 mb-40 sm:p-12 p-8 bg-white rounded-xl">
        <form method="POST" action="https://api.web3forms.com/submit">
          <input type="hidden" name="access_key" value={accessKey} />
          <input type="hidden" name="redirect" value="/"></input>
          <input type="hidden" name="from_name" value="skillsets.tech"></input>
          <input type="hidden" name="subject" value="New Contribution"></input>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mt-4 group">
              <label htmlFor="name" className="block mb-2 text-black text-md">
                Name / Alias
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-[#999] rounded-l-md">
                  <img
                    src="/assets/icons/user.svg"
                    className="w-5 h-5"
                    alt="User icon"
                  />
                </span>
                <input
                  className="rounded-none rounded-r-lg bg-white border border-[#999] text-black focus:ring-[#6875F5] focus:ring-1 focus:border-[#6875F5] block flex-1 min-w-0 w-full text-sm p-3"
                  type="text"
                  name="name"
                  id="name"
                  maxLength={30}
                  autoComplete="off"
                  placeholder="John Doe"
                />
              </div>
              <p className="mt-2 text-sm text-[#999]">
                Optional - if you want a mention in contributions.
              </p>
            </div>
            <div className="relative z-0 w-full mt-4 group">
              <label htmlFor="name" className={`block mb-2 text-black text-md`}>
                Email
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-[#999] rounded-l-md">
                  <img
                    src="/assets/icons/mail.svg"
                    className="w-5 h-5"
                    alt="Mail icon"
                  />
                </span>
                <input
                  className={`rounded-none rounded-r-lg bg-white border border-[#999] text-black focus:ring-[#6875F5] focus:ring-1 focus:border-[#6875F5] block flex-1 min-w-0 w-full text-sm p-3`}
                  type="email"
                  name="email"
                  id="email"
                  maxLength={50}
                  autoComplete="off"
                  placeholder="john.doe@gmail.com"
                />
              </div>
              <p className="mt-2 text-sm text-[#999]">
                Optional - if you want to receive a reply.
              </p>
            </div>
          </div>
          <label
            htmlFor="message"
            className={`block mt-4 mb-2 font-medium text-black text-md`}
          >
            Your contribution
          </label>
          <textarea
            className={`block p-2.5 w-full text-sm text-black bg-white rounded-lg border border-[#999] focus:ring-[#6875F5] focus:border-[#6875F5]`}
            name="message"
            id="message"
            rows={5}
            maxLength={500}
            autoComplete="off"
            placeholder="Hi, please add <skill> to the list."
            required
          ></textarea>
          <button
            type="submit"
            className="inline-flex items-center justify-center mt-8 px-8 py-4 text-sm text-white bg-indigo-500 border border-2 border-indigo-500 rounded hover:bg-indigo-500 hover:shadow-lg"
          >
            Submit contribution
            <img
              src="/assets/icons/arrow-right.svg"
              className="w-6 h-6 ms-2"
              alt="Arrow icon"
            />
          </button>
        </form>
      </div>
    </section>
  );
}
