import { Search } from "react-feather"; // Assuming you're using `react-feather` for icons
import classNames from "classnames";

interface SearchInputProps {
  placeholder?: string;
  size?: "small" | "medium" | "large";
  iconColor?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  className?: string;
}

const SearchInput = ({
  placeholder = "Search...",
  size = "medium",
  iconColor = "text-gray-400",
  onChange,
  value,
  className,
}: SearchInputProps) => {
  const sizeClasses = {
    small: "w-48 py-1 text-sm",
    medium: "w-64 py-2 text-base",
    large: "w-80 py-3 text-lg",
  };

  return (
    <div className={classNames("relative", className)}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className={classNames("h-4 w-4", iconColor)} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={classNames(
          "pl-10 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent",
          sizeClasses[size]
        )}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default SearchInput;
