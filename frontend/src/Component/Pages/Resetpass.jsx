




function ResetPassword() {


  return (
    <div className="flex justify-center items-center min-h-screen text-xl">
      <form className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="text-center font-bold text-4xl mb-10">
            OneDay<span className="text-blue-700">Job</span>
          </div>
        <h2 className="text-xl font-bold mb-4 mt-4">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-3"
         
        />

        <input
          type="password"
          placeholder="Enter new password"
          className="border p-2 w-full mb-2"
        />

      

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >submit
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;

