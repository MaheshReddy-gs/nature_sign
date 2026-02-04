import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="w-full">
      <Navbar />

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  )
}
