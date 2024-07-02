import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import SpinnerProfiles from '../layout/SpinnerProfiles'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Modal from '@material-ui/core/Modal'
import SearchIcon from '@material-ui/icons/Search'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [loadedOnce, setLoadedOnce] = useState(false)
  const [query, setQuery] = useState('')
  const [userInterests, setUserInterests] = useState('')
  const [recommendedBooks, setRecommendedBooks] = useState([])
  const [open, setOpen] = React.useState(false)
  const [selectedBook, setSelectedBook] = useState(undefined)

  const handleClose = () => {
    setOpen(false)
  }
  const openModal = (bookTitle) => {
    const bookSelection = recommendedBooks.filter((book) => {
      return book.title === bookTitle
    })
    console.log(bookSelection)
    setSelectedBook(bookSelection[0])
    setOpen(true)
  }

  const getRecommendations = async (e) => {
    console.log('getRecommendations')

    if (query === '') {
      alert("Please let us know what you'd like to learn!")
      return
    }

    setIsLoading(true)

    await fetch('/api/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        userInterests,
      }),
    })
      .then((res) => {
        console.log(res)
        if (res.ok) return res.json()
      })
      .then((recommendations) => {
        console.log(recommendations.data.Get.Book)
        setRecommendedBooks(recommendations.data.Get.Book)
      })

    setIsLoading(false)
    setLoadedOnce(true)
  }

  return (
    <section className="container-groups">
      <div className="h-screen flex flex-col justify-between bg-gray-100">
        <div className="mb-auto py-10 px-4 bg-gray-100">
          <div className="container mx-auto">
            <h1 className="text-3xl font-black font-bold mb-6 text-center">
              Learning Recommendation
            </h1>
            <label
              htmlFor="favorite-books"
              className="block text-gray-700 font-bold mb-2"
            >
              What would you like to get a book recommendation on for your
              learning journey?
            </label>
            <div className="form-group">
              <TextField
                id="favorite-books"
                type="text"
                name="favorite-books"
                placeholder="I'd like to learn..."
                className="block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                }}
              />
            </div>
            <div className="my-1">
              <Button
                onClick={() => getRecommendations()}
                variant="contained"
                color="secondary"
                startIcon={<SearchIcon />}
              >
                Get recommendation
              </Button>
            </div>
            {isLoading ? (
              <SpinnerProfiles />
            ) : (
              <>
                {loadedOnce ? (
                  <>
                    <div className="profiles">
                      {recommendedBooks.map((book) => (
                        <div
                          key={book.isbn10 || book.isbn13}
                          className="main-profile"
                        >
                          <h4 className="profile-name">{book.title}</h4>
                          <div className="book-image">
                            <img
                              src={book.thumbnail}
                              alt=""
                              className="round-img"
                            />
                          </div>
                          <ul className="profile-skill">
                            {book.authors.split(';').map((author, index) => (
                              <li key={index} className="text-primary skill">
                                {author}
                              </li>
                            ))}
                          </ul>
                          <div className="view-btn">
                            <Button
                              onClick={() => {
                                openModal(book.title)
                              }}
                              variant="contained"
                              color="secondary"
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <h2>{selectedBook && selectedBook.title}</h2>
                          {selectedBook && selectedBook.description}
                        </Box>
                      </Modal>
                    </div>
                  </>
                ) : (
                  <div className="w-full flex justify-center h-60 pt-10"></div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
