using Core.Models;

namespace SayedAlShohada.Models.Mappers
{
    public interface IArticlesMapper
    {
        Articles Map(ArticlesForm form);
        Articles Map(int n, ArticlesForm form);
    }
}
