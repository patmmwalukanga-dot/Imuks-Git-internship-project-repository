export default function PasswordStrength({ password }: { password: string }) {
  const checks = {
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const passed = Object.values(checks).filter(Boolean).length;

  const percentage = (passed / 4) * 100;

  let color = "bg-red-500";

  if (percentage >= 50) color = "bg-yellow-400";

  if (percentage === 100) color = "bg-green-500";

  return (
    <>
      <div className="mt-2">

        <div className="mb-1 flex justify-between text-xs text-gray-500">
          <span>Password strength</span>
          <span>{percentage}%</span>
        </div>

        <div className="h-2 rounded bg-gray-300">

          <div
            className={`h-2 rounded ${color}`}
            style={{ width: `${percentage}%` }}
          ></div>

        </div>

      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">

        <label className="flex items-center gap-2">

          <input type="checkbox" checked={checks.uppercase} readOnly />

          Uppercase

        </label>

        <label className="flex items-center gap-2">

          <input type="checkbox" checked={checks.lowercase} readOnly />

          Lowercase

        </label>

        <label className="flex items-center gap-2">

          <input type="checkbox" checked={checks.number} readOnly />

          Number

        </label>

        <label className="flex items-center gap-2">

          <input type="checkbox" checked={checks.symbol} readOnly />

          Symbol

        </label>

      </div>
    </>
  );
}