import Link from 'next/link'; 

export default function Footer() {
  return (
    <footer className="footer">
      <nav>
        <ul>
          <li className="flink">
            <Link href="/accessibility">
              <a title="Hexagons Accessibility">Accessibility</a>
            </Link>
          </li>
          <li className="flink">
            <Link href="/privacy">
              <a title="Hexagons Privacy">Privacy</a>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
