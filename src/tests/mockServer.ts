import { HttpResponse, http } from 'msw'
import { setupServer } from 'msw/node'

import {
  Product,
  CreateProductRequest,
  UserAuthToken,
  UserLoginRequest,
  UserInfo,
  QueryParams,
  UpdateProductRequest,
  ReviewReadDto
} from '../misc/type'
import { API_URL, urlParser } from '../misc/utils'

export const mockAuthToken: UserAuthToken = {
  accessToken: 'access',
  refreshToken: 'refresh'
}

export const mockRefreshedAuthToken: UserAuthToken = {
  accessToken: 'access access',
  refreshToken: 'refresh'
}

export const mockAuthHeader = {
  Authorization: 'Bearer access'
}
export const mockUserInfo: UserInfo = {
  id: '1',
  firstName: 'user1',
  lastName: 'lastname1',
  email: 'user1@gmail.com',
  role: 0,
  avatar: 'img'
}

export const mockUserRes = {
  id: '1',
  fisrstName: 'user1',
  lastName: 'lastname1',
  email: 'user1@gmail.com',
  role: 'customer',
  avatar: 'img',
  password: ''
}

export const userLoginRequest: UserLoginRequest = {
  email: mockUserInfo.email,
  password: 'user1password'
}

const mockReviews: ReviewReadDto[] = [
  {
    id: '1',
    user: mockUserInfo,
    isAnonymous: false,
    content: 'Great product, highly recommend!',
    rating: 5,
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-02T08:00:00Z'
  },
  {
    id: '2',
    user: mockUserInfo,
    isAnonymous: true,
    content: 'Decent quality, but could be improved.',
    rating: 3,
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-02T08:00:00Z'
  },
  {
    id: '3',
    user: mockUserInfo,
    isAnonymous: false,
    content: 'Not satisfied with the purchase.',
    rating: 2,
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-02T08:00:00Z'
  }
]

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'product1',
    price: 1,
    inventory: 2,
    description: 'product1',
    rating: 3,
    images: [
      { id: 'id1', imageUrl: 'img1' },
      { id: 'id2', imageUrl: 'img2' }
    ],
    reviews: mockReviews,
    category: {
      id: '1',
      name: 'cloth',
      image: 'img'
    },
    createdAt: '2024',
    updatedAt: '2024'
  },
  {
    id: '2',
    title: 'product2',
    price: 1,
    inventory: 2,
    description: 'product2',
    rating: 3,
    images: [
      { id: 'id1', imageUrl: 'img1' },
      { id: 'id2', imageUrl: 'img2' }
    ],
    reviews: mockReviews,
    category: {
      id: '1',
      name: 'cloth',
      image: 'img'
    },
    createdAt: '2024',
    updatedAt: '2024'
  },
  {
    id: '3',
    title: 'product3',
    price: 1,
    inventory: 2,
    description: 'product3',
    rating: 3,
    reviews: mockReviews,

    images: [
      { id: 'id1', imageUrl: 'img1' },
      { id: 'id2', imageUrl: 'img2' }
    ],
    category: {
      id: '1',
      name: 'cloth',
      image: 'img'
    },
    createdAt: '2024',
    updatedAt: '2024'
  }
]

export const mockProductsPaged = [
  {
    id: '255',
    title: 'de',
    price: 120000,
    inventory: 100,
    rating: 1,
    description: 'ddddddddddd',
    images: [
      'https://placeimg.com/640/480/any',
      'https://placeimg.com/640/480/any'
    ],
    createdAt: '2024-02-29T14:45:15.000Z',
    updatedAt: '2024-02-29T14:52:59.000Z',
    category: {
      id: '1',
      name: 'Clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      createdAt: '2024-02-29T03:37:26.000Z',
      updatedAt: '2024-02-29T03:37:26.000Z'
    }
  },
  {
    id: '256',
    title: 'frio',
    price: 12,
    inventory: 10,
    rating: 3,
    description: 'dddddddddd',
    images: [
      'https://placeimg.com/640/480/any',
      'https://placeimg.com/640/480/any'
    ],
    createdAt: '2024-02-29T14:45:58.000Z',
    updatedAt: '2024-02-29T14:45:58.000Z',
    category: {
      id: '1',
      name: 'Clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      createdAt: '2024-02-29T03:37:26.000Z',
      updatedAt: '2024-02-29T03:37:26.000Z'
    }
  },
  {
    id: '257',
    title: 'New Product Course',
    price: 122,
    inventory: 70,
    rating: 3,
    description: 'A description',
    images: ['https://placeimg.com/640/480/any'],
    createdAt: '2024-02-29T14:48:24.000Z',
    updatedAt: '2024-02-29T14:48:24.000Z',
    category: {
      id: '1',
      name: 'Clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      createdAt: '2024-02-29T03:37:26.000Z',
      updatedAt: '2024-02-29T03:37:26.000Z'
    }
  },
  {
    id: '258',
    title: 'New Product Course',
    price: 122,
    inventory: 22,
    rating: 2,
    description: 'A description',
    images: ['https://placeimg.com/640/480/any'],
    createdAt: '2024-02-29T14:48:35.000Z',
    updatedAt: '2024-02-29T14:48:35.000Z',
    category: {
      id: '1',
      name: 'Clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      createdAt: '2024-02-29T03:37:26.000Z',
      updatedAt: '2024-02-29T03:37:26.000Z'
    }
  },
  {
    id: '259',
    title: 'Juegos',
    price: 10,
    inventory: 100,
    rating: 1,
    description: 'ssssssssssssssssss',
    images: [
      'https://placeimg.com/640/480/any',
      'https://placeimg.com/640/480/any'
    ],
    createdAt: '2024-02-29T14:48:37.000Z',
    updatedAt: '2024-02-29T14:48:37.000Z',
    category: {
      id: 1,
      name: 'Clothes',
      image: 'https://i.imgur.com/QkIa5tT.jpeg',
      createdAt: '2024-02-29T03:37:26.000Z',
      updatedAt: '2024-02-29T03:37:26.000Z'
    }
  }
]

export const mockCategories = [
  {
    id: '1',
    name: 'Clothes',
    image: 'https://i.imgur.com/QkIa5tT.jpeg'
  },
  {
    id: '2',
    name: 'Electronics',
    image: 'https://i.imgur.com/ZANVnHE.jpeg'
  },
  {
    id: '3',
    name: 'Furniture',
    image: 'https://i.imgur.com/Qphac99.jpeg'
  }
]

export const handler = [
  http.get(`${API_URL}/products`, ({ request, params }) => {
    const url = request.url
    if (
      url.includes('title') &&
      url.includes('offset') &&
      url.includes('limit')
    ) {
      const title = urlParser(url)['title'].toLowerCase()
      const offset = Number(urlParser(url)['offset'])
      const limit = Number(urlParser(url)['limit'])
      const begin = offset * limit
      const end = begin + limit
      const res = mockProductsPaged
        .filter((p) => p.title.toLowerCase().includes(title))
        .slice(begin, end)
      return HttpResponse.json(res)
    }
    if (url.includes('title')) {
      const title = urlParser(url)['title'].toLowerCase()
      return HttpResponse.json(
        mockProductsPaged.filter((p) => p.title.toLowerCase().includes(title))
      )
    }
    if (url.includes('offset') && url.includes('limit')) {
      const offset = parseInt(urlParser(url)['offset'])
      const limit = parseInt(urlParser(url)['limit'])

      const begin = offset * limit
      const end = begin + limit
      const res = mockProductsPaged.slice(begin, end)
      return HttpResponse.json(res)
    }

    return HttpResponse.json(mockProductsPaged, { status: 200 })
  }),
  http.put(`${API_URL}/products/:id`, async ({ request, params }) => {
    const id = params.id
    const body = (await request.json()) as UpdateProductRequest
    const index = mockProducts.findIndex((_p) => _p.id === id)
    if (index !== -1) {
      const updatedProd = {
        ...mockProducts[index],
        title: body.title,
        price: body.price
      }
      mockProducts.splice(index, 1, updatedProd)
      return HttpResponse.json(mockProducts.find((p) => p.id === id))
    } else {
      return HttpResponse.json(null, { status: 404 })
    }
  }),
    http.delete(`${API_URL}/products/:id`, ({ request, params }) => {
      const id = params.id
      const index = mockProducts.findIndex((_p) => _p.id === id)
      if (index !== -1) {
        mockProducts.splice(index, 1)
        return HttpResponse.json(true)
      } else {
        return new HttpResponse(null, { status: 404 })
      }
    }),
  http.post(`${API_URL}/products`, async ({ request, params }) => {
    const body = await request.json()
    return HttpResponse.json(body)
  }),
  http.get(`${API_URL}/categories`, () => {
    return HttpResponse.json(mockCategories)
  }),
  http.get(`${API_URL}/categories/:id/products`, ({ request, params }) => {
    const id = Number(params.id)
    const filteredProducts = mockProductsPaged.filter(
      (p) => p.category.id === id
    )
    return HttpResponse.json(filteredProducts)
  }),
  http.get(`${API_URL}/products/:id`, ({ request, params }) => {
    const productId = params.id
    if (productId) {
      const product = mockProducts.find((_p) => _p.id === productId)
      return HttpResponse.json(product)
    } else {
      return new HttpResponse(null, { status: 404 })
    }
  }),
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    const userReq = (await request.json()) as UserLoginRequest | null
    if (!userReq) {
      return new HttpResponse(null, { status: 400 })
    }
    if (
      userReq?.email === userLoginRequest.email &&
      userReq?.password === userLoginRequest.password
    ) {
      return HttpResponse.json(mockAuthToken, { status: 200 })
    }
    return new HttpResponse(null, { status: 400 })
  }),
  http.get(`${API_URL}/auth/profile`, ({ request }) => {
    if (!request.headers.has('Authorization')) {
      throw new HttpResponse(null, { status: 400 })
    } else {
      if (request.headers.get('Authorization') === 'Bearer access') {
        return HttpResponse.json(mockUserRes, { status: 200 })
      } else {
        throw new HttpResponse(null, { status: 400 })
      }
    }
  }),
  http.post(`${API_URL}/auth/refresh-token`, async ({ request }) => {
    const token = (await request.json()) as { refreshToken: string } | null
    if (!token) {
      throw new HttpResponse(null, { status: 400 })
    } else {
      if (token['refreshToken'] === 'refresh') {
        return HttpResponse.json(mockRefreshedAuthToken)
      }
    }
    return new HttpResponse(null, { status: 400 })
  })
]

export const mockServer = setupServer(...handler)
