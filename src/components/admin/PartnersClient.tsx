"use client";

import { useState } from "react";
import { Users, Plus, Mail, Phone, Briefcase } from "lucide-react";
import { addPartner, Partner } from "@/app/actions/partners";
import { useToast } from "@/components/admin/Toast";

export default function PartnersClient({ initialPartners }: { initialPartners: Partner[] }) {
    const [partners, setPartners] = useState<Partner[]>(initialPartners);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            const newPartner = await addPartner(formData);
            setPartners([newPartner, ...partners]);
            setIsModalOpen(false);
            showToast("Partenaire ajouté avec succès !", "success");
        } catch (error) {
            showToast("Erreur lors de l'ajout du partenaire", "error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <Users className="text-blue-600" />
                        Gestion des Partenaires
                    </h1>
                    <p className="text-slate-500">
                        {partners.length} installateurs / partenaires enregistrés
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium shadow-lg shadow-blue-900/20"
                >
                    <Plus size={18} />
                    Ajouter un Partenaire
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map(partner => (
                    <div key={partner.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900">{partner.name}</h3>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">Actif</span>
                        </div>
                        <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-slate-400" />
                                <a href={`mailto:${partner.email}`} className="hover:text-blue-600">{partner.email}</a>
                            </div>
                            {partner.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-slate-400" />
                                    <span>{partner.phone}</span>
                                </div>
                            )}
                            {partner.company_info && typeof partner.company_info === 'object' && 'company_name' in partner.company_info && (
                                <div className="flex items-center gap-2">
                                    <Briefcase size={14} className="text-slate-400" />
                                    <span className="font-medium text-slate-900">{(partner.company_info as any).company_name}</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                            <span className="text-slate-400">Ajouté le {new Date(partner.created_at).toLocaleDateString()}</span>
                            <button className="text-blue-600 font-bold hover:underline">Modifier</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Ajout */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-bold mb-4">Nouveau Partenaire</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nom / Contact</label>
                                <input name="name" required placeholder="Jean Dupont" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email (pour notif)</label>
                                <input name="email" type="email" required placeholder="contact@elec.com" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone</label>
                                <input name="phone" placeholder="06..." className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Société</label>
                                <input name="company" placeholder="ELEC 2000" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-slate-50 font-medium">Annuler</button>
                                <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50">
                                    {loading ? 'Ajout...' : 'Ajouter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
