// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import filters from "../../data/filters";
import jobs from "../../data/jobs";

export default async (req, res) => {
  res.statusCode = 200;
  // @todo: implement filters and search
  let data = jobs.map(job => {
    return {
      ...job,
      items: job.items.filter(item => {
        if (
          item.job_title.toLowerCase().includes(req.query.search) ||
          job.name.toLowerCase().includes(req.query.search) ||
          item.description.toLowerCase().includes(req.query.search) ||
          item.city.toLowerCase().includes(req.query.search)
        )
          return true;
      })
    };
  });
  let { location, experience } = req.query;

  if (location) {
    data = data.map(job => {
      return {
        ...job,
        items: job.items.sort((a, b) =>
          location === "true"
            ? a.location - b.location
            : b.location - a.location
        )
      };
    });
  }
  if (experience) {
    data = data.map(job => {
      return {
        ...job,
        items: job.items.sort((a, b) =>
          experience === "true"
            ? a.experience - b.experience
            : b.experience - a.experience
        )
      };
    });
  }
  // @todo: implement automated tests

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  // await new Promise((resolve)=>setTimeout(resolve, 1000 * Math.random()));

  res.json(data);
};
