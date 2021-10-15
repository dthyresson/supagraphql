--
-- Name: countries Enable access to all users; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable access to all users" ON public.countries FOR SELECT USING (true);

--
-- Name: countries Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable insert for authenticated users only" ON public.countries FOR INSERT WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: countries Enable update for users based auth; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Enable update for users based auth" ON public.countries FOR UPDATE USING ((auth.role() = 'authenticated'::text)) WITH CHECK ((auth.role() = 'authenticated'::text));


--
-- Name: countries; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
