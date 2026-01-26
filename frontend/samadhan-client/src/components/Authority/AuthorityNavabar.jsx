export default function AuthorityNavbar() {
return (
<nav className="w-full bg-white border-b">
<div className="flex justify-between items-center px-8 py-4">


<div>
<h1 className="text-xl font-bold text-blue-700">Samadhan</h1>
<p className="text-sm text-gray-500">Authority Portal</p>
</div>


<button className="text-sm text-gray-700 hover:underline">
Logout
</button>


</div>
</nav>
);
}