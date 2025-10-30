import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, BookOpen, ZoomIn, ZoomOut, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const books = [
  {
    id: 1,
    title: "Kiberxavfsizlik Asoslari",
    author: "S. K. Ganiev, A. A. Ganiev, Z. T. Xudoyqulov ",
    readers: 1240,
    likes: 532,
    image: "/images/kiber.png",
    file: "/materials/Kiberxavfsizlik-asoslari-2.pdf",
  },
  {
    id: 2,
    title: "Axborot Xavsizligi Asoslari",
    author: "Tahirov Behzod Nasriddinovich",
    readers: 980,
    likes: 411,
    image: "/images/axborot.png",
    file: "/materials/axborot xavsizligi.pdf",
  },
  {
    id: 3,
    title: "Informatika o'qitish metodikasi",
    author: "M.E.Mamarajabov, D.E.Toshtemirov, O‘.A.Yuldashev",
    readers: 1567,
    likes: 690,
    image: "/images/image.png",
    file: "/materials/informatika o'qitish metodikasi.pdf",
  },
]

const Guides = () => {
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [zoom, setZoom] = useState(1)
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.6))

  // Mobil uchun “pastga surib yopish”
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndY.current = e.changedTouches[0].clientY
    if (touchEndY.current - touchStartY.current > 100) {
      setSelectedBook(null)
      setZoom(1)
    }
  }

  return (
    <section className="container mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-8 relative">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-20 text-center">
        Kiberxavfsizlik <span className="text-primary">qo‘llanmalari</span>
      </h1>

      {/* Kitoblar ro‘yxati */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <Card
            key={book.id}
            className="flex flex-col items-center sm:items-start p-4 hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedBook(book)}
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full sm:w-48 lg:w-56 h-64 object-cover rounded-lg shadow-md mx-auto"
            />

            <CardContent className="flex flex-col items-start gap-2 mt-4">
              <h3 className="text-lg sm:text-xl font-semibold">{book.title}</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Muallif: {book.author}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" /> {book.readers.toLocaleString()} o‘quvchi
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-500" /> {book.likes.toLocaleString()} like
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedBook(book)
                }}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto"
              >
                Kitobni o‘qish
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* PDF modal (animatsiyali) */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex flex-col z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="flex justify-center items-center flex-1 overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
              <iframe
                src={selectedBook.file}
                className="w-full h-full max-w-[100vw] max-h-[100vh] transition-transform duration-200"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "center",
                }}
              />
            </motion.div>

            {/* Pastki boshqaruv paneli */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-4 bg-white/90 dark:bg-gray-900/90 px-5 py-3 rounded-full shadow-lg backdrop-blur-md">
              <button
                onClick={handleZoomOut}
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 transition"
              >
                <ZoomOut className="w-6 h-6" />
              </button>
              <span className="text-sm font-medium">
                {(zoom * 100).toFixed(0)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 transition"
              >
                <ZoomIn className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  setSelectedBook(null)
                  setZoom(1)
                }}
                className="p-3 bg-red-100 dark:bg-red-800 rounded-full text-red-600 hover:bg-red-200 dark:hover:bg-red-700 active:scale-95 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Guides
