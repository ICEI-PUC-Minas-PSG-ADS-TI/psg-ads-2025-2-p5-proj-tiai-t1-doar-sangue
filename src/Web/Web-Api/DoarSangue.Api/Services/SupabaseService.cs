using Supabase;
namespace DoarSangue.Api.Services
{
    public class SupabaseService
    {
        private readonly Client _client;

        public SupabaseService(IConfiguration configuration)
        {
            var url = configuration["Supabase:Url"];
            var key = configuration["Supabase:Key"];

            _client = new Client(url, key, new SupabaseOptions
            {
                AutoRefreshToken = true,
                AutoConnectRealtime = false
            });

            _client.InitializeAsync().GetAwaiter().GetResult();
        }

        public Client Client => _client;
    }
}

