import Link from "next/link";

function getGradient(name: string) {
  const gradients = [
    "from-pink-400 via-red-400 to-yellow-400",
    "from-green-400 via-teal-400 to-blue-400",
    "from-purple-400 via-pink-400 to-indigo-400",
    "from-yellow-400 via-orange-400 to-red-400",
    "from-blue-400 via-cyan-400 to-teal-400",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export default getGradient;
