import { mount } from '@vue/test-utils'
import Restaurantecard from '~/components/Restaurantecard'

describe('Restaurantecard', () => {
  const props = {
    id: 0,
    name: 'nombre',
    description: 'description',
    text: 'testo largo',
    slug: 'slug',
    category: 'categoria',
    city: 'ciudad',
    address: 'direccion',
    likes: 0,
    image: 'https://netlify.pedrojimenez.info/photosCursoOpenWebinar/restaurant08.jpg'
  }

  const wrapper = mount(Restaurantecard, { propsData: props })
  test('is Mounted', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
  test('is rendering a restaurant', () => {
    expect(wrapper.props().name).toBe('nombre')
    expect(wrapper.props().description).toBe('description')
  })
})
