export default function (context) {
  let { $axios, params } = context;
  console.log(context, '==context')
  let id = params.id;
  console.log(id, '==id')
  return 123
  // $axios.get(`/get-md/${id}`)
  // .then(res => {
  //   console.log(res, '==rander-markdown')
  // })
}