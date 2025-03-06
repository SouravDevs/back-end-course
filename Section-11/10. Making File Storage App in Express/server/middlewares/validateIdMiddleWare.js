export default function (req, res, next, id) {
    console.log({ id });
    console.log(req.method, 'from id');

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  
    if (!uuidRegex.test(id)) {
      return res.status(400).json({ error: `Invalid id: ${id}` })
    }
    next()
  }