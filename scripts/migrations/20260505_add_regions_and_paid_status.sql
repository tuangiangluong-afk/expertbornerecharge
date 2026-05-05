-- Add region to leads table
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS region text;

-- Add is_paid to leads table
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS is_paid boolean DEFAULT false;

-- Add managed_regions to partners table
ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS managed_regions text[] DEFAULT '{}';

-- Add index for regional filtering
CREATE INDEX IF NOT EXISTS idx_leads_region ON public.leads(region);
CREATE INDEX IF NOT EXISTS idx_partners_managed_regions ON public.partners USING GIN (managed_regions);

-- Add comment to clarify region source
COMMENT ON COLUMN public.leads.region IS 'Detected region based on tenant/domain during insertion';
