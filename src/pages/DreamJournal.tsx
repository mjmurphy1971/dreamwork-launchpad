import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DreamJournal } from "@/components/DreamJournal";

const DreamJournalPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <DreamJournal />
      </main>
      <Footer />
    </div>
  );
};

export default DreamJournalPage;