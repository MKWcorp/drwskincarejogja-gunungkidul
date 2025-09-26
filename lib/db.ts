import { neon } from '@neondatabase/serverless';

// Cek apakah DATABASE_URL sudah ada
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Buat koneksi SQL menggunakan driver Neon
const sql = neon(process.env.DATABASE_URL);

// Ekspor fungsi query dengan template literals
export async function query(queryString: string, params: unknown[] = []) {
  try {
    // Untuk query dengan parameter, kita perlu menggunakan format yang berbeda
    // Contoh penggunaan: await query('SELECT * FROM users WHERE id = $1', [userId])
    if (params.length > 0) {
      // Buat query dengan placeholder manual - ini tidak ideal tapi bekerja
      let paramIndex = 1;
      const processedQuery = queryString.replace(/\$\d+/g, () => {
        const value = params[paramIndex - 1];
        paramIndex++;
        return typeof value === 'string' ? `'${value}'` : String(value);
      });
      const result = await sql([processedQuery] as unknown as TemplateStringsArray);
      return result;
    } else {
      // Query tanpa parameter
      const result = await sql([queryString] as unknown as TemplateStringsArray);
      return result;
    }
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Fungsi query yang lebih aman menggunakan template literals
export { sql };

// Test koneksi database
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    console.log('Database connected successfully:', result);
    return result;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export default sql;