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
  let { location, experience, role } = req.query;

  if (location) {
    data = data.sort((x, y) => {
      return x.items[0].zip < y.items[0].zip ? -1 * location : 1 * location;
    });
  }

  if (experience) {
    data = data.sort((x, y) => {
      return x.items[0].experience < y.items[0].experience
        ? -1 * experience
        : 1 * experience;
    });
  }

  if (role) {
    data = data.sort((x, y) => {
      return x.job_title < y.job_title ? -1 * role : 1 * role;
    });
  }

  res.json(data);
};
